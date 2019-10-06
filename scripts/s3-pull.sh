#!/bin/bash
prompt=$'=============================================\nARE YOU SURE YOU WANT TO PULL?\nThis will overwrite your local content and\nshould only be done on the remote linux machine.\nType \'yes pull\' to continue.\n=============================================\n'
read -p "$prompt" -n 8 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^yes\ pull$ ]]
then
  #gets the path for the most api.zip most recently pushed to s3
  zip_path=deployments/$(aws s3 ls s3://deployments/mp-frontend-prod/ --recursive | sort | tail -n 1 | awk '{print $4}')
  aws s3 cp s3://$zip_path ~/frontend.zip
  unzip -o ~/frontend.zip -d ~/www/
  sudo rm -fr ~/../../var/www
  sudo mv www ../../var/
fi