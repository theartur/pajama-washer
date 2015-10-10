echo "$(wget -O - https://faucetbox.com/en/list | grep 'leave?url=')" > clean-addr-btc.txt
node faucet-list-cleaner-btc.js