echo "$(wget -O - https://faucetbox.com/en/list | grep 'leave?url=')" > clean-addr.txt
node faucet-list-cleaner.js