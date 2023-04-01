

output "database_endpoint" {
  description = "The endpoint of the database"
  value       = aws_db_instance.minibrands_tracker_database.address
}

output "database_port" {
  description = "The port of the database"
  value       = aws_db_instance.minibrands_tracker_database.port
}

output "ec2_tag_name" {
  value = aws_instance.minibrands_tracker_backend[0].tags["Name"]
}
