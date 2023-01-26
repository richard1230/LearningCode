

```shell
mac@192:~/WebstormProjects/fullstack/laravel/weibo|static-pages 
#此时在分支
git add -A
git commit -m "info"
git checkout main
#回到主分支了
git merge static-pages(分支)
#tijiao.sh 这个脚本是自己写的
./tijiao.sh "info"
```