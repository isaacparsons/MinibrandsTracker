
resource "aws_cloudwatch_log_group" "codebuild_terraform_pipeline_log_group" {
  name = "minibrands_tracker_codebuild"
}

resource "aws_cloudwatch_log_stream" "codebuild_terraform_pipeline_stream" {
  name           = "minibrands_tracker_codebuild"
  log_group_name = aws_cloudwatch_log_group.codebuild_terraform_pipeline_log_group.name
}
