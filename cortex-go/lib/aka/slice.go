package aka

func SliceMap[InputElementT any, OutputElementT any](inputSlice []InputElementT, mappingFunc func(inputElement InputElementT, index int) OutputElementT) []OutputElementT {
	outputSlice := []OutputElementT{}

	for index, inputElement := range inputSlice {
		outputSlice = append(outputSlice, mappingFunc(inputElement, index))
	}
	return outputSlice
}

func SliceConcat[ElementT any](inputSlices ...[]ElementT) []ElementT {
	outputSlice := []ElementT{}
	for _, inputSlice := range inputSlices {
		outputSlice = append(outputSlice, inputSlice...)
	}
	return outputSlice
}

func SliceEvery[ElementT any](inputSlice []ElementT, testFunc func(inputElement ElementT, index int) bool) bool {
	isEvery := true
	for index, inputElement := range inputSlice {
		isEvery = isEvery && testFunc(inputElement, index)
	}
	return isEvery
}

func SliceSome[ElementT any](inputSlice []ElementT, testFunc func(inputElement ElementT, index int) bool) bool {
	isSome := true
	for index, inputElement := range inputSlice {
		isSome = isSome || testFunc(inputElement, index)
	}
	return isSome
}
