#!/bin/bash

# Fix file watcher limit issue
echo "Current file watcher limit:"
cat /proc/sys/fs/inotify/max_user_watches

echo -e "\nIncreasing file watcher limit to 524288..."
sudo sysctl fs.inotify.max_user_watches=524288
sudo sysctl -p

echo -e "\nMaking the change permanent..."
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf

echo -e "\nNew file watcher limit:"
cat /proc/sys/fs/inotify/max_user_watches

echo -e "\nDone! Please restart your Vite dev server."
