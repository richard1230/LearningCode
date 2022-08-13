#！/bin/bash

git add . &&
git commit -m "$1" &&
git pull  &&
git push -u origin main
#git push -u gitlab-codelearning main