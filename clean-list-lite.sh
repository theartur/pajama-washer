echo "$(wget -O - https://faucetbox.com/en/list/LTC | grep 'leave?url=')" > clean-addr-lite.txt
node faucet-list-cleaner-lite.js