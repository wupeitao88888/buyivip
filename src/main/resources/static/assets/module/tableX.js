/** EasyWeb spa v3.0.8 data:2019-03-24 License By http://easyweb.vip */

layui.define(["jquery", 'table'], function (exports) {
    var $ = layui.jquery;
    var table = layui.table;

    var tableX = {
        merges: function (tableId, indexs, fields) {
            for (var i = 0; i < indexs.length; i++) {
                tableX.merge(tableId, indexs[i], fields[i]);
            }
            var $trs = $('[lay-filter="' + tableId + '"]+.layui-table-view .layui-table-body tr');
            $trs.find('[del="true"]').remove();
            // 监听排序事件
            table.on('sort(' + tableId + ')', function (obj) {
                tableX.merges(tableId, indexs, fields);
            });
        },
        merge: function (tableId, index, field) {
            var $trs = $('[lay-filter="' + tableId + '"]+.layui-table-view .layui-table-body tr');
            var data = table.cache[tableId];
            var lastValue = data[0][field], spanNum = 1;
            for (var i = 1; i < data.length; i++) {
                if (data[i][field] == lastValue) {
                    spanNum++;
                    if (i == data.length - 1) {
                        $trs.eq(i - spanNum + 1).find('td').eq(index).attr('rowspan', spanNum);
                        for (var j = 1; j < spanNum; j++) {
                            $trs.eq(i - j + 1).find('td').eq(index).attr('del', 'true');
                        }
                    }
                } else {
                    $trs.eq(i - spanNum).find('td').eq(index).attr('rowspan', spanNum);
                    for (var j = 1; j < spanNum; j++) {
                        $trs.eq(i - j).find('td').eq(index).attr('del', 'true');
                    }
                    spanNum = 1;
                    lastValue = data[i][field];
                }
            }
        }
    };

    exports("tableX", tableX);
});