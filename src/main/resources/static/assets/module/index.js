/** EasyWeb spa v3.0.8 data:2019-03-24 License By http://easyweb.vip */

layui.define(["layer", "element", "config", "layRouter", "admin", "contextMenu"], function(u) {
	var d = layui.jquery;
	var t = layui.layer;
	var b = layui.element;
	var r = layui.config;
	var l = layui.layRouter;
	var k = layui.admin;
	var v = layui.contextMenu;
	var a = ".layui-layout-admin>.layui-header";
	var n = ".layui-layout-admin>.layui-side>.layui-side-scroll";
	var i = ".layui-layout-admin>.layui-body";
	var m = i + ">.layui-tab";
	var s = i + ">.layui-body-header";
	var h = "admin-pagetabs";
	var o = "admin-side-nav";
	var c;
	var g = {
		mTabPosition: undefined,
		regRouter: function(w) {
			d.each(w, function(y, z) {
				if (z.url && z.url.indexOf("#") == 0) {
					var x = g.getHashPath(z.url);
					l.reg(x, function(A) {
						g.loadView({
							menuId: A.href,
							menuPath: r.viewPath + x + r.viewSuffix,
							menuName: z.name
						})
					})
				}
				if (z.subMenus) {
					g.regRouter(z.subMenus)
				}
			})
		},
		loadView: function(C) {
			var D = C.menuId;
			var A = C.menuPath;
			var y = C.menuName;
			var z = i + ">div[lay-id]";
			if (r.pageTabs) {
				var x;
				d(m + ">.layui-tab-title>li").each(function(E) {
					if (d(this).attr("lay-id") === A) {
						x = true;
						return false
					}
				});
				if (!x) {
					if (d(m + ">.layui-tab-title>li").length >= r.maxTabNum) {
						t.msg("最多打开" + r.maxTabNum + "个选项卡", {
							icon: 2
						});
						g.go(g.mTabPosition);
						return
					}
					b.tabAdd(h, {
						id: A,
						title: '<span class="title">' + y + "</span>",
						content: '<div lay-id="' + D + '" lay-url="' + A + '"></div>'
					})
				}
				z = m + '>.layui-tab-content>.layui-tab-item>div[lay-url="' + A + '"]';
				if (D != d(z).attr("lay-id")) {
					d(z).attr("lay-id", D);
					x = false
				}
				if (!x || l.isRefresh) {
					g.renderView(A, z)
				}
				if (!C.noChange) {
					b.tabChange(h, A)
				}
			} else {
				var w = d(z);
				if (!w || w.length <= 0) {
					var B = '<div class="layui-body-header">';
					B += '      <span class="layui-body-header-title"></span>';
					B += '      <span class="layui-breadcrumb pull-right">';
					B += '         <a href="#' + c + '">首页</a>';
					B += "         <a><cite></cite></a>";
					B += "      </span>";
					B += "   </div>";
					B += '   <div lay-id="' + D + '"></div>';
					d(i).html(B);
					b.render("breadcrumb")
				} else {
					w.attr("lay-id", D)
				}
				if (c != D) {
					g.setTabTitle(y)
				} else {
					g.setTabTitle(undefined)
				}
				g.mTabPosition = D;
				k.activeNav(D);
				g.renderView(A, z)
			}
			if (k.getPageWidth() <= 750) {
				k.flexible(true)
			}
			d(".layui-table-tips-c").trigger("click")
		},
		renderView: function(x, y, z) {
			var w = d(y);
			!z && (z = w.parent());
			k.showLoading(z);
			w.load(x, function() {
				setTimeout(function() {
					k.removeLoading(z)
				}, 150)
			})
		},
		loadHome: function(x) {
			var y = x.url;
			var w = x.name;
			c = y.substring(1);
			g.regRouter([x]);
			if (r.pageTabs) {
				g.loadView({
					menuId: c,
					menuPath: r.viewPath + g.getHashPath(y) + r.viewSuffix,
					menuName: w,
					noChange: true
				})
			}
			l.init({
				index: y.substring(1),
				notFound: function(z) {
					r.routerNotFound && r.routerNotFound(z)
				}
			})
		},
		openNewTab: function(w) {
			g.regRouter([w]);
			g.go(w.url.substring(1))
		},
		closeTab: function(w) {
			b.tabDelete(h, r.viewPath + w + r.viewSuffix)
		},
		go: function(w) {
			l.go(w)
		},
		getHashPath: function(z) {
			var w = layui.router(z);
			var y = "";
			for (var x = 0; x < w.path.length; x++) {
				y += ("/" + w.path[x])
			}
			return y
		},
		setTabTitle: function(x, w) {
			if (!r.pageTabs) {
				if (x) {
					d(s).addClass("show");
					var y = d(s + ">.layui-body-header-title");
					y.html(x);
					y.next(".layui-breadcrumb").find("cite").last().html(x)
				} else {
					d(s).removeClass("show")
				}
			} else {
				!x && (x = "");
				!w && (w = g.getHashPath());
				d(m + '>.layui-tab-title>li[lay-id="' + w + '"] .title').html(x)
			}
		},
		setTabTitleHtml: function(w) {
			if (!r.pageTabs) {
				if (w) {
					d(s).addClass("show");
					d(s).html(w)
				} else {
					d(s).removeClass("show")
				}
			}
		}
	};
	var j = layui.data(r.tableName);
	if (j) {
		var p = j.openTab;
		if (p != undefined) {
			r.pageTabs = p
		}
		var q = j.openFooter;
		if (q != undefined && q == false) {
			d("body.layui-layout-body").addClass("close-footer")
		}
	}
	var f = ".layui-layout-admin .site-mobile-shade";
	if (d(f).length <= 0) {
		d(".layui-layout-admin").append('<div class="site-mobile-shade"></div>')
	}
	d(f).click(function() {
		k.flexible(true)
	});
	if (r.pageTabs && d(m).length <= 0) {
		var e = '<div class="layui-tab" lay-allowClose="true" lay-filter="admin-pagetabs">';
		e += '       <ul class="layui-tab-title"></ul>';
		e += '      <div class="layui-tab-content"></div>';
		e += "   </div>";
		e += '   <div class="layui-icon admin-tabs-control layui-icon-prev" ew-event="leftPage"></div>';
		e += '   <div class="layui-icon admin-tabs-control layui-icon-next" ew-event="rightPage"></div>';
		e += '   <div class="layui-icon admin-tabs-control layui-icon-down">';
		e += '      <ul class="layui-nav admin-tabs-select" lay-filter="admin-pagetabs-nav">';
		e += '         <li class="layui-nav-item" lay-unselect>';
		e += "            <a></a>";
		e += '            <dl class="layui-nav-child layui-anim-fadein">';
		e += '               <dd ew-event="closeThisTabs" lay-unselect><a>关闭当前标签页</a></dd>';
		e += '               <dd ew-event="closeOtherTabs" lay-unselect><a>关闭其它标签页</a></dd>';
		e += '               <dd ew-event="closeAllTabs" lay-unselect><a>关闭全部标签页</a></dd>';
		e += "            </dl>";
		e += "         </li>";
		e += "      </ul>";
		e += "   </div>";
		d(i).html(e);
		b.render("nav")
	}
	b.on("tab(" + h + ")", function(x) {
		var w = d(this).attr("lay-id");
		var y = d(m + '>.layui-tab-content>.layui-tab-item>div[lay-url="' + w + '"]').attr("lay-id");
		g.mTabPosition = y;
		k.rollPage("auto");
		k.activeNav(y);
		g.go(y);
		d(window).resize()
	});
	b.on("nav(" + o + ")", function(x) {
		var w = d(x);
		if ("true" == d(n + ">.layui-nav-tree").attr("lay-accordion")) {
			if (w.parent().hasClass("layui-nav-itemed") || w.parent().hasClass("layui-this")) {
				d(n + ">.layui-nav .layui-nav-itemed").not(w.parents(".layui-nav-child").parent()).removeClass("layui-nav-itemed");
				w.parent().addClass("layui-nav-itemed")
			}
			w.trigger("mouseenter")
		}
		k.setNavHoverCss(w.parentsUntil(".layui-nav-item").parent().children().eq(0))
	});
	d("body").off("click.navMore").on("click.navMore", "[nav-bind]", function() {
		var w = d(this).attr("nav-bind");
		d('ul[lay-filter="' + o + '"]').addClass("layui-hide");
		d('ul[nav-id="' + w + '"]').removeClass("layui-hide");
		if (k.getPageWidth() <= 750) {
			k.flexible(false)
		}
		d(a + ">.layui-nav .layui-nav-item").removeClass("layui-this");
		d(this).parent(".layui-nav-item").addClass("layui-this")
	});
	if (r.openTabCtxMenu && r.pageTabs) {
		d(m + ">.layui-tab-title").off("contextmenu.tab").on("contextmenu.tab", "li", function(x) {
			var w = d(this).attr("lay-id");
			v.show([{
				icon: "layui-icon layui-icon-refresh",
				name: "刷新当前",
				click: function() {
					b.tabChange(h, w);
					k.refresh(g.getHashPath("#" + w))
				}
			}, {
				icon: "layui-icon layui-icon-close-fill ctx-ic-lg",
				name: "关闭当前",
				click: function() {
					k.closeThisTabs(w)
				}
			}, {
				icon: "layui-icon layui-icon-unlink",
				name: "关闭其他",
				click: function() {
					k.closeOtherTabs(w)
				}
			}, {
				icon: "layui-icon layui-icon-close ctx-ic-lg",
				name: "关闭全部",
				click: function() {
					k.closeAllTabs()
				}
			}], x.clientX, x.clientY);
			return false
		})
	}
	u("index", g)
});