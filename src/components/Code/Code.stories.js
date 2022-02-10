import Code from './Code.vue'

export default {
  title: 'Miter Design/Code',
  component: Code,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/JomY9jsgJdal9wfPBtpWkY/UI?node-id=2403%3A81594'
    }
  }
}

const Template = (args) => ({
  components: { Code },
  setup() {
    return { args }
  },
  template: `<Code v-bind="args" >${args.template || "{{ args.content }}"}</Code>`
})

export const SingleLine = Template.bind({})
SingleLine.args = {
  value: 'prefect orion start',
  content: 'prefect orion start',
  hideCopyButton: false,
}

const text = `#!/bin/bash

echo "Enter your lucky number"
read n
case $n in
101)
echo echo "You got 1st prize" ;;
510)
echo "You got 2nd prize" ;;
999)
echo "You got 3rd prize" ;;
*)
echo "Sorry, try for the next time" ;;
esac`

export const MultiLine = Template.bind({})
MultiLine.args = {
  value: text,
  template: `<pre>${text}</pre>`,
  hideCopyButton: false,
}
const longText = `{
  "name": "CHANGEME",
  "description": "CHANGEME",
  "environment": "CHANGEME",
  "secret_file": "CHANGEME",
  "run_sequentially": false,
  "orchestration": "ha_controller_n_compute",
  "nodes": [
    {
      "fqdn": "CHANGEME",
      "password": "CHANGEME",
      "identity_file": "CHANGEME",
      "quit_on_error": true,
      "run_order_number": 1,
      "runlist": [
        "role[ibm-os-ha-controller-node]" 
      ]
    },
    {
      "fqdn": "CHANGEME",
      "password": "CHANGEME",
      "identity_file": "CHANGEME",
      "quit_on_error": true,
      "run_order_number": 1,
      "runlist": [
        "role[ibm-os-ha-controller-node]" 
      ]
    },
    {
      "fqdn": "CHANGEME",
      "password": "CHANGEME",
      "identity_file": "CHANGEME",
      "quit_on_error": true,
      "run_order_number": 1,
      "runlist": [
        "role[ibm-os-ha-controller-node]" 
      ]
    },
    {
      "fqdn": "CHANGEME",
      "password": "CHANGEME",
      "identity_file": "CHANGEME",
      "quit_on_error": true,
      "run_order_number": 10,
      "runlist": [
        "role[ibm-os-compute-node-kvm]" 
      ]
    },
  ]
}`

export const Overflow = Template.bind({})
Overflow.args = {
  value: longText,
  template: `<pre>${longText}</pre>`,
  style: 'max-height: 600px',
  hideCopyButton: false,
}
