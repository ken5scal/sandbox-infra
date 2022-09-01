import { Construct } from "constructs";
import { App, RemoteBackend, TerraformOutput, TerraformStack } from "cdktf";
import { AwsProvider, ec2 } from "@cdktf/provider-aws";

class MyStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    // define resources here
    new AwsProvider(this, "AWS", {
      region: "ap-northeast-1",
    })

    const instance = new ec2.Instance(this, "compute", {
      ami: "ami-01456a894f71116f2",
      instanceType: "t2.micro"
    })

    new TerraformOutput(this, "public_ip", {
      value: instance.publicIp
    })
  }
}

const app = new App();
const stack = new MyStack(app, "aws_instance");

new RemoteBackend(stack, {
  hostname: "app.terraform.io",
  organization: "secure-brigade",
  workspaces: {
    name: "learn-cdktf"
  }
})

app.synth();
