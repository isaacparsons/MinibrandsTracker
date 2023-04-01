resource "aws_cloudwatch_log_group" "minibrands_tracker_ec2_log_group" {
  name = "minibrands_tracker_ec2_log_group"
}

resource "aws_cloudwatch_log_stream" "minibrands_tracker_ec2_log_stream" {
  name           = aws_instance.minibrands_tracker_backend[0].id
  log_group_name = aws_cloudwatch_log_group.minibrands_tracker_ec2_log_group.name
}
