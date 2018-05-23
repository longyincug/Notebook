# bootstrap


## 容器


1. 流体容器(`container-fluid`)

    - 容器的width为auto，两边有15px的padding。
    - 注意auto和100%不同，width默认值为auto，如果给其添加padding，会削减content的宽度，盒子的总宽度不会变。

2. 固定容器(`container`)

    - 容器的width会随设备分辨率的不同而变化。
    - 分辨率阈值:
    
    | 分辨率范围        | 容器宽度    |  padding  |
    | --------------- | ----------------:| :-------------------------------: |
    | w >= 1200 (lg 大屏PC)      | 容器的width为1170 | 左右padding为15 （注意是borderBox）|
    | 1200 > w >= 992 (md 中屏PC) | 容器的width为970  | 左右padding为15 （注意是borderBox）|
    | 992 > w >= 768 (sm 平板)  | 容器的width为750  | 左右padding为15 （注意是borderBox）|
    | 768 > w (xs 移动手机)        | 容器的width为auto | 左右padding为15 （注意是borderBox）|

3. 流体容器&固定容器 公共样式

  ```
  margin-right: auto;
  margin-left: auto;
  padding-left:  15px;
  padding-right: 15px;  
  ```

4. 固定容器 特定样式
    
    ```
    //顺序不可变(移动设备优先)
      @media (min-width: @screen-sm-min) {
        width: @container-sm;
      }
      @media (min-width: @screen-md-min) {
        width: @container-md;
      }
      @media (min-width: @screen-lg-min) {
        width: @container-lg;
      }
    ```



***


## 栅格系统


1. **行**的设计

    ```
    margin-left: -15px;
    margin-right: -15px;
    ```

2. **列**的源码

    ```
    .make-grid-columns()--->
    
        .col-xs-1, .col-sm-1, .col-md-1, .col-lg-1,
        .col-xs-2, .col-sm-2, .col-md-2, .col-lg-2,
        ...
        .col-xs-12, .col-sm-12, .col-md-12, .col-lg-12{
          position: relative;
          min-height: 1px;
          padding-left: 15px;
          padding-right: 15px;
        }
    
    .make-grid(xs)--->
    
      float-grid-columns(@class);
             * .col-xs-1,.col-xs-2,.col-xs-3,.col-xs-4,...col-xs-12{
             *     float: left;
             * }
      .loop-grid-columns(@grid-columns, @class, width);
             * .col-xs-12{
             *     width:12/12;
             * }
             * .col-xs-11{
             *     width:11/12;
             * }
             * ...
             * .col-xs-1{
             *     width:1/12;
             * } 
      
      //列排序
      .loop-grid-columns(@grid-columns, @class, pull);
      .loop-grid-columns(@grid-columns, @class, push);
             *push                      pull:
             * .col-xs-push-12{         .col-xs-pull-12{      
             *     left:12/12;              right:12/12;
             * }                        }
             * .col-xs-push-11{
             *     left:11/12;
             * }
             * ...                      ...
             * .col-xs-push-1{
             *     left:1/12;
             * } 
             * .col-xs-push-0{           .col-xs-pull-0{
             *     left:auto;               right:auto;
             * }                         }
       //列偏移   
      .loop-grid-columns(@grid-columns, @class, offset);
            * .col-xs-offset-12{
            *  margin-left: 12/12;   
            * }
            * 
            * ...
            *
            * .col-xs-offset-0{
            *  margin-left: 0;   
            * }
    ```












