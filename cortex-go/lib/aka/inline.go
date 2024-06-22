package aka

func IfElse[T any](condition bool, ifTrue T, ifFalse T) T {
	if condition {
		return ifTrue
	}
	return ifFalse
}

func ForEach[IndexT comparable, ReturnT any](startingIndex IndexT, criterion func(currentIndex IndexT) bool, iterate func(currentIndex IndexT) IndexT, do func(currentIndex IndexT) ReturnT) []ReturnT {
	returns := []ReturnT{}
	for index := startingIndex; criterion(index); index = iterate(index) {
		returns = append(returns, do(index))
	}
	return returns
}
