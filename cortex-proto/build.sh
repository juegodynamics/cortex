protoc \
    -I=./models \
    -I=$HOME/dev/github.com/protocolbuffers/protobuf/src \
    --go_out=../cortex-go/models \
    --go_opt=paths=source_relative \
    --go-grpc_out=../cortex-go/models \
    --go-grpc_opt=paths=source_relative \
    ./models/**/*.proto
