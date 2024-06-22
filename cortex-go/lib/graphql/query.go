package graphql

import (
	"fmt"
	"reflect"
	"strings"
)

func PrintFields(input interface{}) string {
	return printFields(reflect.TypeOf(input), 0)
}

func printFields(reflectType reflect.Type, indent int) string {
	if reflectType.Kind() == reflect.Slice || reflectType.Kind() == reflect.Pointer {
		return printFields(reflectType.Elem(), indent)
	}

	fieldSnippets := []string{}
	for fieldIndex := 0; fieldIndex < reflectType.NumField(); fieldIndex++ {
		reflectField := reflectType.Field(fieldIndex)
		fieldSnippet := strings.Repeat("\t", indent) + camelCase(reflectField.Name)

		gqlType, _, _ := MapReflectToGQLType(reflectField.Type)
		if !IsPrimitiveType(gqlType) {
			fieldSnippet += fmt.Sprintf(" {\n%s\n%s}", printFields(reflectField.Type, indent+1), strings.Repeat("\t", indent))
		}

		fieldSnippets = append(fieldSnippets, fieldSnippet)
	}

	return strings.Join(fieldSnippets, "\n")

}
