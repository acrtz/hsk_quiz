#!/bin/bash
npm run build
cd build
zip -r frontend.zip . 
aws s3 mv frontend.zip s3://deployments/mp-frontend-prod/mp-frontend-prod-`date  +%s`.zip
rm -fr frontend.zip
cd ..
