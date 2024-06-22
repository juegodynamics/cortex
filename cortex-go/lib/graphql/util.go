package graphql

import (
	"strings"

	"github.com/juegodynamics/cortex/lib/aka"
)

func camelCase(input string) string {
	return strings.Join(aka.SliceMap(strings.Split(input, " "), func(word string, _ int) string {
		return strings.ToLower(string(word[0])) + word[1:]
	}), " ")
}
