package graphql

import (
	"fmt"
	"reflect"

	"github.com/juegodynamics/cortex/lib/aka"
)

type Type = string

const (
	Type_Int      Type = "Int"
	Type_Float    Type = "Float"
	Type_String   Type = "String"
	Type_Boolean  Type = "Boolean"
	Type_ID       Type = "ID"
	Type_Int64    Type = "Int64"
	Type_DateTime Type = "DateTime"
)

func GetPrimitiveTypes() *aka.Record[Type, struct{}] {
	primitiveTypes := aka.NewRecord[Type, struct{}]()
	for _, typeValue := range []Type{
		Type_Int,
		Type_Float,
		Type_String,
		Type_Boolean,
		Type_ID,
		Type_Int64,
		Type_DateTime,
	} {
		primitiveTypes.Add(typeValue, struct{}{})
	}
	return primitiveTypes
}

func IsPrimitiveType(typeValue Type) (isPrimitiveType bool) {
	isPrimitiveType = GetPrimitiveTypes().HasKey(typeValue)
	return
}

func MapReflectToGQLType(reflectType reflect.Type) (gqlType Type, isList bool, isPointer bool) {
	switch reflectType.Kind() {
	case reflect.Int:
	case reflect.Int32:
	case reflect.Int64:
		gqlType = Type_Int
		return
	case reflect.Float32:
	case reflect.Float64:
		gqlType = Type_Float
		return
	case reflect.String:
		gqlType = Type_String
		return
	case reflect.Bool:
		gqlType = Type_Boolean
		return
	case reflect.Slice:
		isList = true
		gqlType, _, isPointer = MapReflectToGQLType(reflectType.Elem())
		return
	case reflect.Array:
		isList = true
		gqlType, _, isPointer = MapReflectToGQLType(reflectType.Elem())
		return
	case reflect.Pointer:
		isPointer = true
		gqlType, isList, _ = MapReflectToGQLType(reflectType.Elem())
		return
	case reflect.Struct:
		gqlType = Type(reflectType.Name())
		return
	}
	panic(fmt.Sprintf("Attempted to map reflect `%s` but no supported mapping exists", reflectType.Kind()))
}
