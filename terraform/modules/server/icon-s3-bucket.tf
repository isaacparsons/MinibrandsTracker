
resource "aws_s3_bucket" "icon_bucket" {
  bucket = var.icon_bucket_name
}

# resource "aws_s3_bucket_acl" "acl" {
#   bucket = aws_s3_bucket.icon-bucket.id
#   acl    = "public-read"
# }

resource "aws_s3_bucket_cors_configuration" "cors" {
  bucket = aws_s3_bucket.icon_bucket.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["PUT"]
    allowed_origins = ["*"]
  }
}

resource "aws_s3_bucket_policy" "policy" {
  bucket = aws_s3_bucket.icon_bucket.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action    = ["s3:GetObject"]
        Effect    = "Allow"
        Sid       = ""
        Principal = "*",
        Resource : "arn:aws:s3:::${var.icon_bucket_name}/*",
      },
    ]
  })
}
