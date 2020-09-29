# VxCadastro.StatusUpdaterLambda
Routine for updating status agent daily

## Local

For local executing you can set the local mongo connection string and execute **yarn & yarn start**.

## AWS lambda

Our lambda is hosted in *São Paulo* zone in developer or in production consoles and it's called **StatusUpdaterCadastroAgents**. 

To use this script in lambda you must transpile it using *Babel*, with **yarn build**, and copy the files from inside the built folder and the *node_modules* in a *.zip* file. Then you can upload this right in lambda.

## AWS configuration

Lambda is configured with a *cron* by **CloudWatch** event generator that will call it's main function everyday at 03:00h GMT.  
