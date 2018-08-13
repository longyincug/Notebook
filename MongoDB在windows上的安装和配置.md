# MongoDB在windows上的安装和配置

<br>

## 1. 简介

`MongoDB`是为快速开发互联网Web应用而设计的数据库系统。它的数据模型是面向**文档**的，一种类似于`JSON`的结构。

<br>

## 2. 安装和配置

以`windows`平台上安装`MongoDB 3.6`版本为例:

1. 先在 [官网](https://www.mongodb.com/download-center?jmp=nav#community) 下载`MongoDB`安装包。

2. 下载完毕后将`MongoDB`安装到一个自己容易找到的目录中，如`C:\Program Files\MongoDB`，然后配置好`MongoDB`的**环境变量**。

3. 在C盘根目录创建一个目录名为`data`，在`data`中再新建一个文件夹为`db`，这是`MongoDB`数据文件的默认存储位置。

	如果要自定义数据库文件的存储位置，通过命令`mongod --dbpath (路径)`来实现。

4. 在CMD窗口中输入`mongod`，启动数据库服务器。（如果是32位windows，第一次启动时需要输入:`mongod --storageEngine=mmapv1`，注意高版本MongoDB不支持32位windows）

    - MongoDB数据库服务器的默认端口号为`27017`。
    
    - 自定义端口号通过命令`mongod --port (端口号)`来实现。

5. 不要关闭该窗口，然后再打开一个CMD，输入`mongo`，即可启动数据库客户端，连接数据库服务器，进行增删改查操作。


<br>


## 3. 将MongoDB设置为系统服务


我们每次都需要开一个CMD窗口启动`MongoDB`服务器，同时再开一个窗口启动客户端进行操作，而不能关闭前一个窗口，这样其实比较麻烦。

可以将`MongoDB`设置为系统服务，自动在后台启动，不需要每次都手动启动。

1. 在C盘根目录创建`data`目录，并在`data`下创建`db`和`log`文件夹。

2. 创建配置文件。在目录`C:\Program Files\MongoDB\Server\3.6`下创建一个配置文件`mongod.cfg`。

    `mongod.cfg:`
  
    ```
    systemLog:
        destination: file
        path: c:\data\log\mongod.log
    storage:
        dbPath: c:\data\db
    ```

    一定要注意格式，缩进不要用tab键而要用空格代替，最好直接复制过去。

	如果不能在该目录中直接新建，可以在桌面上创建完后移动到该文件夹中。
	![mongod_file](https://img-blog.csdn.net/20180607145422527?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xvbmd5aW4wNTI4/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

3. **管理员身份**开启CMD，执行以下命令来将`MongoDB`添加到系统服务中:

  ```
  sc.exe create MongoDB binPath= "\"C:\Program Files\MongoDB\Server\3.6\bin\mongod.exe\" --service --config=\"C:\Program Files\MongoDB\Server\3.6\mongod.cfg\"" DisplayName= "MongoDB" start= "auto"
  ```

  注意对照自己的`MongoDB`版本和目录名适当修改路径。书写格式需要严格遵守。
  
  创建`MongoDB`服务成功：
  
  ![mongod_create](https://img-blog.csdn.net/20180607145718182?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xvbmd5aW4wNTI4/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)
  
4. 在任务管理器中找到系统服务界面，启动`MongoDB`服务。
	![service_manage](https://img-blog.csdn.net/2018060715011417?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xvbmd5aW4wNTI4/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)
	点击最下方的**打开服务**，并找到`MongoDB`，右键启动：
	
	![ready](https://img-blog.csdn.net/20180607150444533?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xvbmd5aW4wNTI4/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)
	启动`MongoDB`服务成功后：
	![success](https://img-blog.csdn.net/20180607150349378?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xvbmd5aW4wNTI4/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

	现在可以打开CMD窗口，直接输入`mongo`，连接`MongoDB`服务器进行操作了。
	
5. 如果启动失败，说明之前的操作出错，需要通过命令`sc delete MongoDB`删除刚才配置的服务，然后再次尝试（多半是`mongod.cfg`文件出错）。

