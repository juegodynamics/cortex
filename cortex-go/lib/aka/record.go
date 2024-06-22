package aka

import "github.com/sirupsen/logrus"

type KeyValuePair[KeyT comparable, ValueT any] struct {
	Key   KeyT   `json:"key"`
	Value ValueT `json:"value"`
}

func NewKeyValuePair[KeyT comparable, ValueT any](key KeyT, value ValueT) *KeyValuePair[KeyT, ValueT] {
	return &KeyValuePair[KeyT, ValueT]{Key: key, Value: value}
}

type Record[KeyT comparable, ValueT any] struct {
	entries map[KeyT]ValueT
	order   []KeyT
}

func NewRecord[KeyT comparable, ValueT any]() *Record[KeyT, ValueT] {
	return &Record[KeyT, ValueT]{
		entries: map[KeyT]ValueT{},
		order:   []KeyT{},
	}
}

func (record *Record[KeyT, ValueT]) Add(key KeyT, value ValueT) {
	_, hasKey := record.entries[key]
	if hasKey {
		logrus.Warnf("Record - Tried to Add `key: %v, value: %v` when key already exists", key, value)
		return
	}
	record.entries[key] = value
	record.order = append(record.order, key)

}

func (record *Record[KeyT, ValueT]) HasKey(key KeyT) (hasKey bool) {
	_, hasKey = record.entries[key]
	return
}

func (record *Record[KeyT, ValueT]) GetEntries() []*KeyValuePair[KeyT, ValueT] {
	entryList := []*KeyValuePair[KeyT, ValueT]{}
	for _, key := range record.order {
		entryList = append(entryList, &KeyValuePair[KeyT, ValueT]{Key: key, Value: record.entries[key]})
	}
	return entryList
}

func (record *Record[KeyT, ValueT]) GetKeys() []KeyT {
	return SliceMap(record.order, func(key KeyT, _ int) KeyT { return key })
}

func (record *Record[KeyT, ValueT]) GetValues() []ValueT {
	return SliceMap(record.GetKeys(), func(key KeyT, _ int) ValueT { return record.entries[key] })
}
