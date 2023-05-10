resource "aws_acm_certificate" "certificate" {
  domain_name       = "minibrandstracker.com"
  validation_method = "DNS"
}
