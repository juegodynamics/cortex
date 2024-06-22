package graphql

import (
	"testing"
)

func TestPrintFields_OverallFunctionality(t *testing.T) {
	result := PrintFields(&User{})

	t.Logf("\n%s", result)
}
