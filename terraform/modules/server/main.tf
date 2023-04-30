
data "aws_availability_zones" "available" {
  state = "available"
}


data "aws_ami" "ubuntu" {
  most_recent = "true"

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  owners = ["099720109477"]
}



resource "aws_key_pair" "kp" {
  key_name   = "kp"
  public_key = file("${path.module}/kp.pub")
}

data "aws_iam_policy_document" "ec2_minibrands_tracker_iam_policy_document" {
  statement {
    actions = [
      "cloudwatch:PutMetricData",
      "ec2:DescribeVolumes",
      "ec2:DescribeTags",
      "logs:PutLogEvents",
      "logs:DescribeLogStreams",
      "logs:DescribeLogGroups",
      "logs:CreateLogStream",
      "logs:CreateLogGroup"
    ]
    resources = [
      "*"
    ]
    effect = "Allow"
  }

  statement {
    sid = "allowListBucket"
    actions = [
      "ssm:GetParameter"
    ]
    resources = [
      "arn:aws:ssm:*:*:parameter/AmazonCloudWatch-*"
    ]
    effect = "Allow"
  }

  statement {
    effect = "Allow"
    actions = [
      "s3:*",
      "s3-object-lambda:*"
    ]
    resources = ["*"]
  }

}

resource "aws_iam_policy" "ec2_minibrands_tracker_iam_policy" {
  name        = "Ec2IamPolicyMinibrandsTracker"
  description = "access to cloudwatch, s3"

  policy = data.aws_iam_policy_document.ec2_minibrands_tracker_iam_policy_document.json
}

resource "aws_iam_role" "ec2_minibrands_tracker_iam_role" {
  name        = "Ec2ServerRoleMinibrandsTTracker"
  description = "access to cloudwatch, s3"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Sid    = ""
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      },
    ]
  })
}

resource "aws_iam_role_policy_attachment" "ec2_minibrands_tracker_iam_role_policy_attachment" {
  role       = aws_iam_role.ec2_minibrands_tracker_iam_role.name
  policy_arn = aws_iam_policy.ec2_minibrands_tracker_iam_policy.arn
}


data "template_file" "user_data" {
  template = file("${path.module}/userdata.sh.tpl")
}

resource "aws_iam_instance_profile" "ec2_minibrands_tracker_profile" {
  name = "ec2_profile_minibrands_tracker"
  role = aws_iam_role.ec2_minibrands_tracker_iam_role.name
}

resource "aws_instance" "minibrands_tracker_backend" {
  count = var.settings.backend.count
  ami   = data.aws_ami.ubuntu.id

  user_data = data.template_file.user_data.rendered

  iam_instance_profile = aws_iam_instance_profile.ec2_minibrands_tracker_profile.name

  instance_type          = var.settings.backend.instance_type
  subnet_id              = aws_subnet.minibrands_tracker_public_subnet[count.index].id
  key_name               = aws_key_pair.kp.key_name
  vpc_security_group_ids = [aws_security_group.minibrands_tracker_backend_sg.id]

  tags = {
    Name = "minibrands_tracker_backend_${count.index}"
  }
}

resource "aws_eip" "minibrands_tracker_eip" {
  count = var.settings.backend.count

  instance = aws_instance.minibrands_tracker_backend[count.index].id

  vpc = true

  tags = {
    Name = "minibrands_tracker_eip_${count.index}"
  }
}
