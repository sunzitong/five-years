
PRONAME=lottery-wheel

# // 删除旧release文件夹
rm -fr ./git_html
rm -fr ./git_static

# // 初始化git
git clone http://githome/fe/html.git git_html
cd ./git_html
git fetch
# 从test创建新分支
git checkout -b test origin/test
# 复制文件到指定位置
cd ../dist && cpy $(find . -type f -name '*.html' | tr '\n' ' ') ../git_html/manual/$PRONAME  --parents

# push代码到remote
cd ../git_html
git add .
git commit -m 'auto upload By shell.'
git push

# 回到根目录
cd ..
# // 初始化git
git clone http://githome/fe/static.git git_static
cd ./git_static
git fetch
# 从test创建新分支
git checkout -b test origin/test
# 复制文件到指定位置
cd ../dist && cpy $(find . -type f ! -name '*.html' | tr '\n' ' ') ../git_static/manual/$PRONAME  --parents

# push代码到remote
cd ../git_static
git add .
git commit -m 'auto upload By shell.'
git push

printf "%-s\t %-s\t\n" No url
printf "%-s\t %-s\t\n" 1 http://oms.test.gyapt.cn/fe/$PRONAME
printf "%-s\t %-s\t\n" 2 http://omstest.longfor.com/fe/$PRONAME