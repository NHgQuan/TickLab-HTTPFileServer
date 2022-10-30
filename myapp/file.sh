#Initializing two variables
a=$1

#Check whether they are equal
if [ $a == create ]
then
    eval node ./feature/runtimeFolder/createFolder.js 
fi
  
#Check whether they are not equal
if [ $a == remove ]
then
    eval node ./feature/runtimeFolder/createFolder.js 
fi






