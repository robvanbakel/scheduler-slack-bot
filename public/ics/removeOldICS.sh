# Shell command to remove any .ics files that are older than 7 days
# Runs every day at mightnight through a cronjob
find ~/avsr.nl/public/ics -name "*.ics" -type f -mtime +6 -exec rm {} \;
