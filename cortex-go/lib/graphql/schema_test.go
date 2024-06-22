package graphql

import (
	"encoding/json"
	"testing"
)

// Test Schema ============================
type User struct {
	UserID string  `json:"id" graphql:"type=ID,required"`
	Roles  []*Role `json:"roles" graphql:"directives=search"`
}
type Role struct {
	RoleID      string        `json:"id" graphql:"type=ID,required"`
	Permissions []*Permission `json:"permissions"`
}
type Permission struct {
	PermissionID string `json:"id" graphql:"type=ID,required"`
	Description  string `json:"description"`
}

func TestStructToSchema_OverallFunctionality(t *testing.T) {
	schema := StructToSchema(&User{})

	schemaJson, jsonErr := json.MarshalIndent(schema, "", "  ")
	if jsonErr != nil {
		panic(jsonErr)
	}

	t.Logf("\n%s", schemaJson)
	t.Logf("\n%s", SchemaGroupString(schema))

}
