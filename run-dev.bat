@echo off
echo Checking dependencies...

for %%d in (api-gateway menu-services order-services payment-services inventory-services customer-services) do (
    if not exist "%%d\node_modules" (
        echo Installing dependencies for %%d...
        cd %%d
        call npm install
        cd ..
    )
)

echo Starting all services...
npx concurrently ^
"cd api-gateway && node index.js" ^
"cd menu-services && node index.js" ^
"cd order-services && node index.js" ^
"cd payment-services && node index.js" ^
"cd inventory-services && node index.js" ^
"cd customer-services && node index.js" 