package main

import (
	"encoding/base64"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"path/filepath"
	"regexp"
	"strconv"
	"strings"
)

// unescapeCSSClassName handles escape sequences in CSS class names
func unescapeCSSClassName(className string) string {
	re := regexp.MustCompile(`\\([0-9a-fA-F]{2})\s?`)
	return re.ReplaceAllStringFunc(className, func(s string) string {
		code, _ := strconv.ParseInt(s[1:], 16, 32)
		return string(rune(code))
	})
}

// Extract and save icons from a style element to a specified directory
func extractAndSaveIcons(cssFile string, outputDir string) {
	// Read the CSS file
	fileContent, err := ioutil.ReadFile(cssFile)
	if err != nil {
		log.Fatalf("Error reading CSS file: %v", err)
	}

	// Define the regex to extract base64 images and their CSS class names
	re := regexp.MustCompile(`(?m)(\.icon-[^\s]+)\s*\{[^}]*background-image:\s*url\(data:image/png;base64,([^)]*)\)`)

	// Find all matches
	matches := re.FindAllStringSubmatch(string(fileContent), -1)
	if matches == nil {
		log.Fatalf("No matches found in the CSS file")
	}

	for _, match := range matches {
		// Extract the class name and base64 image data
		className := match[1]
		base64Data := match[2]

		// Unescape the class name
		className = unescapeCSSClassName(className)

		// Decode the base64 string
		imgData, err := base64.StdEncoding.DecodeString(base64Data)
		if err != nil {
			log.Printf("Error decoding base64 data for %s: %v", className, err)
			continue
		}

		// Generate the filename from the CSS class name
		filename := strings.TrimPrefix(className, ".") + ".png"
		filepath := filepath.Join(outputDir, filename)

		// Save the image to the specified directory
		err = ioutil.WriteFile(filepath, imgData, 0644)
		if err != nil {
			log.Printf("Error writing image file for %s: %v", className, err)
			continue
		}

		fmt.Printf("Saved %s\n", filepath)
	}
}

func main() {
	// Input CSS file and output directory
	cssFile := "./iconList.css"
	outputDir := "./out"

	// Create the output directory if it doesn't exist
	if err := os.MkdirAll(outputDir, 0755); err != nil {
		log.Fatalf("Error creating output directory: %v", err)
	}

	// Extract and save icons
	extractAndSaveIcons(cssFile, outputDir)
}
