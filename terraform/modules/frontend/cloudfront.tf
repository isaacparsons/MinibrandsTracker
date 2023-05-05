# resource "aws_cloudfront_distribution" "minibrands_tracker_frontend_distribution" {
#   origin {
#     domain_name = aws_s3_bucket_website_configuration.website_config.website_domain
#     origin_id   = aws_s3_bucket_website_configuration.website_config.website_domain
#   }

#   enabled         = true
#   is_ipv6_enabled = true

#   aliases = ["minibrandstracker.com"]

#   default_cache_behavior {
#     allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
#     cached_methods   = ["GET", "HEAD"]
#     target_origin_id = local.s3_origin_id

#     forwarded_values {
#       query_string = false

#       cookies {
#         forward = "none"
#       }
#     }

#     viewer_protocol_policy = "allow-all"
#     min_ttl                = 0
#     default_ttl            = 3600
#     max_ttl                = 86400
#   }

#   price_class = "PriceClass_200"

#   tags = {
#     Environment = "production"
#   }

#   viewer_certificate {
#     acm_certificate_arn = true
#   }
# }
