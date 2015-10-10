echo "$(wget -O - https://faucetbox.com/en/list/DOGE | grep 'leave?url=')" > clean-addr-doge.txt
node faucet-list-cleaner-doge.js