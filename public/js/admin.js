$(function(){
    // console.log('cc');
    PNotify.prototype.options.styling = "bootstrap3";
    var $bannerTable = $('#banner-table');

    var bannerAddDialogInstance = new BootstrapDialog()
        .setTitle('新建Banner')
        .setMessage($(getBannerForm()));
    bannerAddDialogInstance.open();

    $('.m-side-menu .m-side-item').on('click', function(e) {
        console.log('cc');
        e.stopPropagation();
        $(this).tab('show');
    });



    $bannerTable.bootstrapTable({
        // idField: 'id',
        url: '/api/banner/data',
        responseHandler: responseHandler,
        classes: 'table table-hover table-no-bordered',
        height: 550,
        striped: true,
        cache: false,
        queryParams: function(params) {
            // params.is_active = 1;
            return params;
        },
        pagination: true,
        sidePagination: 'server',
        pageNumber: 1,
        pageSize: 10,
        pageList: '[10, 20, 50, 100]',
        search: false,
        showRefresh: true,
        showColumns: true,
        sortOrder: 'desc',
        sortName: 'sort_order',
        // showPaginationSwitch: true,
        toolbar: '#banner-toolbar',
        clickToSelect: true,
        columns: [
            {
                field: 'state',
                checkbox: true
            },
            {
                field: 'id',
                title: 'ID',
                visible: false
                // switchable: false,
                // sortable: true
            },
            {
                field: 'index',
                title: '序号'
            },
            {
                field: 'title',
                title: '标题',
                visible: false
            },
            {
                field: 'src',
                title: '图片',
                formatter: srcFormatter
            },
            {
                field: 'link',
                title: '链接',
                visible: false,
                formatter: linkFormatter
            },
            {
                field: 'is_active',
                title: '激活状态',
                formatter: isActiveFormatter,
            },
            {
                field: 'sort_order',
                title: '优先级',
                sortable: true
            }
        ]
    });

    function getBannerForm() {
        // var str = '<form class="form-horizontal">';

        // function getInput(item) {
        //     var str = '<div class="form-group">'+
        //                   '<label class="col-sm-2 control-label">'+ item.title +'</label>'+
        //                   '<div class="col-sm-10">'+
        //                       '<input type='+ item.type +' class="form-control" name='+ item.name +'/>'+
        //                   '</div>'+
        //               '</div>';
        //     return str;
        // }

        // for (var i = 0 ; i < inputs.length; i++) {
        //     str += getInput(inputs[i]);
        // }
        //  '<label class="col-sm-2 control-label">标题</label>' +
        //  '<div class="col-sm-10">'+
        //      '<input type="text" class="form-control" name="title"/>'+
        //  '</div>'+
        //  '<div class="col-sm-10"></div>'

        var str = '<form class="form-horizontal">'+
                     '<div class="form-group">'+
                         '<label class="col-sm-2 control-label">选择图片</label>'+
                         '<div class="col-sm-10">'+
                             '<input type="file" data-preview="bannerImgPreview" onchange="xmTanUploadImg(this)"/>'+
                             '<p class="help-block">.jpg .png格式 小于2M</p>'+
                         '</div>'+
                     '</div>'+
                     '<div class="form-group" id="bannerImgPreview">'+
                         '<div class="col-sm-10 col-sm-offset-2">'+
                            '<img style="width: 100%;" src="">'+
                         '</div>'+
                     '</div>'+
                  '</form>'
        return str;


    }

 

    function responseHandler(res) {
        // console.log('cc');
        // console.log(res.data);
        if (res.success) return res.data;
        else 
            new PNotify({
                title: '获取数据警告',
                text: res.msg
            });
    }

    function isActiveFormatter(value, row) {
        return value == 1 
            ? '<span data-active='+ value +'>已激活</span>' 
            : '<span data-active='+ value +'>未激活</span>';
    }

    function srcFormatter(value, row) {
        return '<a href='+ value +' target="_blank">查看图片</a>';
    }

    function linkFormatter(value, row) {
        return '<a href='+ value +' target="_blank">'+ value +'</a>';
    }
});


function xmTanUploadImg(obj) {
    var file = obj.files[0];
    console.log(obj, file);
    var size = null;
    if (file.size < 1024) size = file.size + ' b';
    else if (file.size >= 1024 && file.size < (1024 * 1024)) size = (file.size / 1024) + ' kb';
    else size = (file.size / (1024 * 1024)) + ' mb';

    console.log(size);

    var reader = new FileReader();

    reader.onloadstart = function(e) {
        console.log('开始读取...');
    };

    reader.onprogress = function(e) {
        console.log('正在读取中');
    };

    reader.onabort = function(e) {
        console.log('中断读取');
    }

    reader.onerror = function(e) {
        console.log('读取异常');
    }

    reader.onload = function(e) {
        var preview = $(obj).data('preview');
        $('#' + preview).find('img').attr('src', e.target.result);
    }

    reader.readAsDataURL(file);
}



