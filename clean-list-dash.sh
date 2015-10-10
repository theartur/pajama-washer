echo "$(wget -O - https://faucetbox.com/en/list/DASH | grep 'leave?url=')" > clean-addr-dash.txt
node faucet-list-cleaner-dash.js