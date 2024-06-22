package graphql

import (
	"fmt"
	"reflect"
	"sort"
	"strings"

	"github.com/juegodynamics/cortex/lib/aka"
)

// type StructToSchemaRequest struct {
// 	Struct interface{} `json:"struct"`
// }

// type StructToSchemaResponse struct {
// 	PrimarySchema *Schema `json:"primarySchema"`
// 	NestedSchemata map[string]*Schema `json:"nestedSchemata"`
// }

type SchemaGroup = map[string]*Schema

func SchemaGroupString(schemaGroup SchemaGroup) string {
	lines := []string{}
	keys := []string{}
	for key := range schemaGroup {
		keys = append(keys, key)
	}

	sort.Strings(keys)

	for _, key := range keys {
		lines = append(lines, schemaGroup[key].String())
	}

	return strings.Join(lines, "\n")
}

type SchemaBuilder struct {
	schemata SchemaGroup
}

func NewSchemaBuilder() *SchemaBuilder {
	return &SchemaBuilder{schemata: map[string]*Schema{}}
}

func StructToSchema(request interface{}) (response SchemaGroup) {
	builder := NewSchemaBuilder()
	builder.structToSchema(reflect.TypeOf(request))

	return builder.schemata
}

func (builder *SchemaBuilder) structToSchema(reflectType reflect.Type) {
	if reflectType.Kind() == reflect.Slice || reflectType.Kind() == reflect.Pointer {
		builder.structToSchema(reflectType.Elem())
		return
	}

	builder.schemata[reflectType.Name()] = NewSchema(reflectType.Name())

	for fieldIndex := 0; fieldIndex < reflectType.NumField(); fieldIndex++ {
		reflectField := reflectType.Field(fieldIndex)

		gqlType, isList, _ := MapReflectToGQLType(reflectField.Type)
		schemaField := &SchemaField{
			Name:   camelCase(reflectField.Name),
			Type:   gqlType,
			IsList: isList,
		}

		gqlTagString, hasGQLtags := reflectField.Tag.Lookup("graphql")
		if hasGQLtags {
			for _, snippet := range strings.Split(gqlTagString, ",") {
				snippetKeyVal := strings.Split(snippet, "=")
				if snippetKeyVal[0] == "type" {
					schemaField.Type = snippetKeyVal[1]
				}
				if snippetKeyVal[0] == "required" {
					schemaField.IsRequired = true
				}
				if snippetKeyVal[0] == "directives" {
					schemaField.Directives = strings.Split(snippetKeyVal[1], "&")
				}
			}

		}

		builder.schemata[reflectType.Name()].Add(schemaField)

		if !IsPrimitiveType(gqlType) {
			builder.structToSchema(reflectField.Type)
		}

	}
}

type Schema struct {
	Name   string         `json:"name"`
	Fields []*SchemaField `json:"fields"`
}

func NewSchema(name string) *Schema {
	return &Schema{Name: name, Fields: []*SchemaField{}}
}

func (schema *Schema) Add(schemaField *SchemaField) {
	schema.Fields = append(schema.Fields, schemaField)
}

func (schema *Schema) String() string {
	lines := []string{
		fmt.Sprintf("type %s {", schema.Name),
	}

	for _, schemaField := range schema.Fields {
		lines = append(lines, fmt.Sprintf("\t%s", schemaField.String()))
	}

	lines = append(lines, "}")
	return strings.Join(lines, "\n")
}

type SchemaField struct {
	Name       string   `json:"name"`
	Type       Type     `json:"type"`
	IsList     bool     `json:"isList,omitempty"`
	IsRequired bool     `json:"isRequired,omitempty"`
	Directives []string `json:"directives,omitempty"`
}

func (schemaField *SchemaField) String() string {
	listBraces := aka.IfElse(
		schemaField.IsList,
		[2]string{"[", "]"},
		[2]string{"", ""},
	)

	requiredMark := aka.IfElse(schemaField.IsRequired, "!", "")

	var directiveTags string
	if schemaField.Directives != nil && len(schemaField.Directives) > 0 {
		atFunc := func(directive string, _ int) string { return "@" + directive }

		directiveTags = fmt.Sprintf(" %s", strings.Join(aka.SliceMap(schemaField.Directives, atFunc), " "))

	}

	return fmt.Sprintf(
		"%s: %s%s%s%s%s",
		schemaField.Name,
		listBraces[0],
		schemaField.Type,
		requiredMark,
		listBraces[1],
		directiveTags,
	)
}
