#!/bin/bash

# matseng: To run on the command line:
#  $git init
#  $git add .
#  $git commit -m "Initial commit"
#  $./gitcreate_v02.sh
 
# This script create a new repo on github.com, then pushes to it the local repo from the current directory.
 
# It is a fork of https://gist.github.com/robwierzbowski/5430952/.  Some of Rob's lines just didn't work for me, and to fix them I needed to make it more verbose so that a mere electrical engineer could understand it.
 
# This script gets a username from .gitconfig.  If it indicates that your default username is an empty string, you can set it with
# git config --add github.user YOUR_GIT_USERNAME
 
# Gather constant vars
CURRENTDIR=${PWD##*/}
GITHUBUSER=$(git config github.user)

# Get user input
echo "Enter name for new repo, or just <return> to make it $CURRENTDIR"
read REPONAME
echo "Enter username for new, or just <return> to make it $GITHUBUSER"
read USERNAME_
echo $USERNAME_
echo "Enter description for your new repo, on one line, then <return>"
read DESCRIPTION
echo "Enter <return> to make the new repo public, 'x' for private"
read PRIVATE_ANSWER
 
# see http://www.zsh.org/mla/users/2011/msg00160.html for explanation of using [[]] with zsh
if [[ "$PRIVATE_ANSWER" == "x" ]]; then
  PRIVACYWORD=private
  PRIVATE_TF=true
else
  PRIVACYWORD=public
  PRIVATE_TF=false
fi
 
REPONAME=${REPONAME:-${CURRENTDIR}}
USERNAME_=${USERNAME_:-${GITHUBUSER}}

echo "Will create a new *$PRIVACYWORD* repo named $REPONAME"
echo "on github.com in user account $USERNAME_, with this description:"
echo $DESCRIPTION
echo "Type 'y' to proceed, any other character to cancel."
read OK
if [ "$OK" != "y" ]; then
  echo "User cancelled"
  exit
fi
 
# Curl some json to the github API oh damn we so fancy
curl -u $USERNAME_ https://api.github.com/user/repos -d "{\"name\": \"$REPONAME\", \"description\": \"${DESCRIPTION}\", \"private\": $PRIVATE_TF, \"has_issues\": true, \"has_downloads\": true, \"has_wiki\": false}"
# curl -u $USERNAME_ https://api.github.com/user/repos -d "{\"$USERNAME_\": \"$REPONAME\", \"description\": \"${DESCRIPTION}\", \"private\": $PRIVATE_TF, \"has_issues\": true, \"has_downloads\": true, \"has_wiki\": false}"
 
# Set the freshly created repo to the origin and push
# You'll need to have added your public key to your github account
git remote add origin https://github.com/$USERNAME_/$REPONAME.git
git push -u origin master
