terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "4.0.0"
    }
  }

  # required_version = "~> 1.2.9"
}

provider "aws" {
  region = var.aws_region
}


module "pipeline" {
  source       = "./modules/pipeline"
  ec2_tag_name = module.server.ec2_tag_name


  deployment_group_name = "MinibrandsTrackerCodedeployDeploymentGroup"
  codedeploy_name       = "MinibrandsTrackerCodedeployApplication"

  codebuild_project_name = "MinibrandsTrackerCodebuildProject"
  codepipeline_name      = "MinibrandsTrackerPipeline"

  repository_id = "isaacparsons/MinibrandsTracker"
  branch_name   = "master"
}

module "server" {
  source = "./modules/server"
}


module "frontend" {
  bucket_name = "minibrands-tracker"
  url         = "minibrandstracker.com"
  source      = "./modules/frontend"
}
