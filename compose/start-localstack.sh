#!/bin/bash
export AWS_REGION=eu-west-2
export AWS_DEFAULT_REGION=eu-west-2
export AWS_ACCESS_KEY_ID=test
export AWS_SECRET_ACCESS_KEY=test

aws --endpoint-url=http://localhost:4566 sns create-topic --name test-topic.fifo --attributes "FifoTopic=true"
aws --endpoint-url=http://localhost:4566 sqs create-queue --queue-name test-queue.fifo --attributes "FifoQueue=true"

aws --endpoint-url=http://localhost:4566 sns subscribe --topic-arn arn:aws:sns:eu-west-2:000000000000:test-topic.fifo --protocol sqs --notification-endpoint arn:aws:sqs:eu-west-2:000000000000:test-queue.fifo
