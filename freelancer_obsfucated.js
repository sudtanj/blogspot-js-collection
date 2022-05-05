var relatedTitles = new Array();
var relatedTitlesNum = 0;
var relatedUrls = new Array();
var thumburl = new Array();
var PostCategory;
var AuthorName;
var Postdetails = new Array();
var daystr = new Array();

function related_results_labels_thumbs(json) {
    for (var i = 0; i < json.feed.entry.length; i++) {
        var entry = json.feed.entry[i];
        PostCategory = json.feed.entry[i].category[0].term;
        AuthorName = json.feed.entry[i].author[0].name.$t;
        relatedTitles[relatedTitlesNum] = entry.title.$t;
        p = entry.published.$t;
        var month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        var month2 = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var day = p.split("-")[2].substring(0, 2);
        var m = p.split("-")[1];
        var y = p.split("-")[0];
        for (var u2 = 0; u2 < month.length; u2++) {
            if (parseInt(m) == month[u2]) {
                m = month2[u2];
                break
            }
        }
        daystr[relatedTitlesNum] = day + ' ' + m + ' ' + y;
        if ("content" in entry) {
            var A = entry.content.$t
        } else if ("summary" in n) {
            var A = entry.summary.$t
        } else var A = "";
        var O = /<\S[^>]*>/g;
        A = A.replace(O, "");
        if (A.length < 100) {
            document.write("");
            Postdetails[relatedTitlesNum] = A;
            document.write("")
        } else {
            document.write("");
            A = A.substring(0, 100);
            var M = A.lastIndexOf(" ");
            A = A.substring(0, M);
            Postdetails[relatedTitlesNum] = A
        }
        try {
            thumburl[relatedTitlesNum] = entry.media$thumbnail.url;
            thumburl = thumburl.replace("/s640/", "/s300-a/")
        } catch (error) {
            s = entry.content.$t;
            a = s.indexOf("<img");
            b = s.indexOf("src=\"", a);
            c = s.indexOf("\"", b + 5);
            d = s.substr(b + 5, c - b - 5);
            if ((a != -1) && (b != -1) && (c != -1) && (d != "")) {
                thumburl[relatedTitlesNum] = d
            } else {
                if (typeof(defaultnoimage) !== 'undefined') thumburl[relatedTitlesNum] = defaultnoimage;
                else thumburl[relatedTitlesNum] = "http://3.bp.blogspot.com/-PpjfsStySz0/UF91FE7rxfI/AAAAAAAACl8/092MmUHSFQ0/s1600/no_image.jpg"
            }
        }
        if (relatedTitles[relatedTitlesNum].length > 35) relatedTitles[relatedTitlesNum] = relatedTitles[relatedTitlesNum].substring(0, 100) + "...";
        for (var k = 0; k < entry.link.length; k++) {
            if (entry.link[k].rel == 'alternate') {
                relatedUrls[relatedTitlesNum] = entry.link[k].href;
                relatedTitlesNum++
            }
        }
    }
}

function removeRelatedDuplicates_thumbs() {
    var tmp = new Array(0);
    var tmp2 = new Array(0);
    var tmp3 = new Array(0);
    var tmp4 = new Array(0);
    var tmp5 = new Array(0);
    for (var i = 0; i < relatedUrls.length; i++) {
        if (!contains_thumbs(tmp, relatedUrls[i])) {
            tmp.length += 1;
            tmp[tmp.length - 1] = relatedUrls[i];
            tmp2.length += 1;
            tmp3.length += 1;
            tmp4.length += 1;
            tmp5.length += 1;
            tmp2[tmp2.length - 1] = relatedTitles[i];
            tmp3[tmp3.length - 1] = thumburl[i];
            tmp4[tmp4.length - 1] = Postdetails[i];
            tmp5[tmp5.length - 1] = daystr[i]
        }
    }
    relatedTitles = tmp2;
    relatedUrls = tmp;
    thumburl = tmp3;
    Postdetails = tmp4;
    daystr = tmp5
}

function contains_thumbs(a, e) {
    for (var j = 0; j < a.length; j++)
        if (a[j] == e) return true;
    return false
}

function printRelatedLabels_thumbs(current) {
    var splitbarcolor;
    if (typeof(splittercolor) !== 'undefined') splitbarcolor = splittercolor;
    else splitbarcolor = "#DDDDDD";
    for (var i = 0; i < relatedUrls.length; i++) {
        if ((relatedUrls[i] == current) || (!relatedTitles[i])) {
            relatedUrls.splice(i, 1);
            relatedTitles.splice(i, 1);
            thumburl.splice(i, 1);
            Postdetails.splice(i, 1);
            daystr.splice(i, 1);
            i--
        }
    }
    var r = Math.floor((relatedTitles.length - 1) * Math.random());
    var i = 0;
    if (relatedTitles.length > 0) document.write('<h2>' + relatedpoststitle + '</h2>');
    document.write('<div style="clear: both;"/>');
    while (i < relatedTitles.length && i < 20 && i < maxresults) {
        document.write('<li> <a style="text-decoration:none;float:left;');
        if (i != 0) document.write('border-left:solid 0.5px ' + splitbarcolor + ';"');
        else document.write('"');
        document.write(' href="' + relatedUrls[r] + '"><div class="related-wrap"><img style="width: 166; height: 115px;;" src="' + thumburl[r] + '"/><span class="overlay-bg"></span></div><div class="recent-details"><div class="related-meta"><span class="related-author">' + AuthorName + '</span><span class="related-category">' + PostCategory + '</span><span class="relate-date">' + daystr[r] + '</span></div><h3 class="title">' + relatedTitles[r] + '</h3><span class="recent-content">' + Postdetails[r] + '</span></div></a>');
        i++;
        if (r < relatedTitles.length - 1) {
            r++
        } else {
            r = 0
        }
    }
    document.write('</div>');
    relatedUrls.splice(0, relatedUrls.length);
    thumburl.splice(0, thumburl.length);
    relatedTitles.splice(0, relatedTitles.length)
}(function(a) {
    a.flexslider = function(c, b) {
        var d = c;
        d.init = function() {
            d.vars = a.extend({}, a.flexslider.defaults, b);
            d.data("flexslider", true);
            d.container = a(".slides", d);
            d.slides = a(".slides > li", d);
            d.count = d.slides.length;
            d.animating = false;
            d.currentSlide = d.vars.slideToStart;
            d.animatingTo = d.currentSlide;
            d.atEnd = (d.currentSlide == 0) ? true : false;
            d.eventType = ("ontouchstart" in document.documentElement) ? "touchstart" : "click";
            d.cloneCount = 0;
            d.cloneOffset = 0;
            if (d.vars.controlsContainer != "") {
                d.controlsContainer = a(d.vars.controlsContainer).eq(a(".slides").index(d.container));
                d.containerExists = d.controlsContainer.length > 0
            }
            if (d.vars.manualControls != "") {
                d.manualControls = a(d.vars.manualControls, ((d.containerExists) ? d.controlsContainer : d));
                d.manualExists = d.manualControls.length > 0
            }
            if (d.vars.randomize) {
                d.slides.sort(function() {
                    return (Math.round(Math.random()) - 0.5)
                });
                d.container.empty().append(d.slides)
            }
            if (d.vars.animation.toLowerCase() == "slide") {
                d.css({
                    overflow: "hidden"
                });
                if (d.vars.animationLoop) {
                    d.cloneCount = 2;
                    d.cloneOffset = 1;
                    d.container.append(d.slides.filter(":first").clone().addClass("clone")).prepend(d.slides.filter(":last").clone().addClass("clone"))
                }
                d.container.width(((d.count + d.cloneCount) * d.width()) + 2000);
                d.newSlides = a(".slides > li", d);
                setTimeout(function() {
                    d.newSlides.width(d.width()).css({
                        "float": "left"
                    }).show()
                }, 100);
                d.container.css({
                    marginLeft: (-1 * (d.currentSlide + d.cloneOffset)) * d.width() + "px"
                })
            } else {
                d.slides.css({
                    width: "100%",
                    "float": "left",
                    marginRight: "-100%"
                }).eq(d.currentSlide).fadeIn(400)
            }
            if (d.vars.controlNav) {
                if (d.manualExists) {
                    d.controlNav = d.manualControls
                } else {
                    var g = a('<ol class="flex-control-nav"></ol>');
                    var k = 1;
                    for (var l = 0; l < d.count; l++) {
                        g.append("<li><a>" + k + "</a></li>");
                        k++
                    }
                    if (d.containerExists) {
                        a(d.controlsContainer).append(g);
                        d.controlNav = a(".flex-control-nav li a", d.controlsContainer)
                    } else {
                        d.append(g);
                        d.controlNav = a(".flex-control-nav li a", d)
                    }
                }
                d.controlNav.eq(d.currentSlide).addClass("active");
                d.controlNav.bind(d.eventType, function(i) {
                    i.preventDefault();
                    if (!a(this).hasClass("active")) {
                        d.flexAnimate(d.controlNav.index(a(this)), d.vars.pauseOnAction)
                    }
                })
            }
            if (d.vars.directionNav) {
                var f = a('<ul class="flex-direction-nav"><li><a class="prev" href="#">' + d.vars.prevText + '</a></li><li><a class="next" href="#">' + d.vars.nextText + "</a></li></ul>");
                if (d.containerExists) {
                    a(d.controlsContainer).append(f);
                    d.directionNav = a(".flex-direction-nav li a", d.controlsContainer)
                } else {
                    d.append(f);
                    d.directionNav = a(".flex-direction-nav li a", d)
                }
                if (!d.vars.animationLoop) {
                    if (d.currentSlide == 0) {
                        d.directionNav.filter(".prev").addClass("disabled")
                    } else {
                        if (d.currentSlide == d.count - 1) {
                            d.directionNav.filter(".next").addClass("disabled")
                        }
                    }
                }
                d.directionNav.bind(d.eventType, function(i) {
                    i.preventDefault();
                    var j = (a(this).hasClass("next")) ? d.getTarget("next") : d.getTarget("prev");
                    if (d.canAdvance(j)) {
                        d.flexAnimate(j, d.vars.pauseOnAction)
                    }
                })
            }
            if (d.vars.keyboardNav && a("ul.slides").length == 1) {
                a(document).keyup(function(i) {
                    if (d.animating) {
                        return
                    } else {
                        if (i.keyCode != 39 && i.keyCode != 37) {
                            return
                        } else {
                            if (i.keyCode == 39) {
                                var j = d.getTarget("next")
                            } else {
                                if (i.keyCode == 37) {
                                    var j = d.getTarget("prev")
                                }
                            }
                            if (d.canAdvance(j)) {
                                d.flexAnimate(j, d.vars.pauseOnAction)
                            }
                        }
                    }
                })
            }
            if (d.vars.slideshow) {
                if (d.vars.pauseOnHover && d.vars.slideshow) {
                    d.hover(function() {
                        d.pause()
                    }, function() {
                        d.resume()
                    })
                }
                d.animatedSlides = setInterval(d.animateSlides, d.vars.slideshowSpeed)
            }
            if (d.vars.pausePlay) {
                var e = a('<div class="flex-pauseplay"><span></span></div>');
                if (d.containerExists) {
                    d.controlsContainer.append(e);
                    d.pausePlay = a(".flex-pauseplay span", d.controlsContainer)
                } else {
                    d.append(e);
                    d.pausePlay = a(".flex-pauseplay span", d)
                }
                var h = (d.vars.slideshow) ? "pause" : "play";
                d.pausePlay.addClass(h).text((h == "pause") ? d.vars.pauseText : d.vars.playText);
                d.pausePlay.click(function(i) {
                    i.preventDefault();
                    (a(this).hasClass("pause")) ? d.pause(): d.resume()
                })
            }
            if (d.vars.touchSwipe && "ontouchstart" in document.documentElement) {
                d.each(function() {
                    var i, j = 20;
                    isMoving = false;

                    function o() {
                        this.removeEventListener("touchmove", m);
                        i = null;
                        isMoving = false
                    }

                    function m(s) {
                        if (isMoving) {
                            var p = s.touches[0].pageX,
                                q = i - p;
                            if (Math.abs(q) >= j) {
                                o();
                                var r = (q > 0) ? d.getTarget("next") : d.getTarget("prev");
                                if (d.canAdvance(r)) {
                                    d.flexAnimate(r, d.vars.pauseOnAction)
                                }
                            }
                        }
                    }

                    function n(p) {
                        if (p.touches.length == 1) {
                            i = p.touches[0].pageX;
                            isMoving = true;
                            this.addEventListener("touchmove", m, false)
                        }
                    }
                    if ("ontouchstart" in document.documentElement) {
                        this.addEventListener("touchstart", n, false)
                    }
                })
            }
            if (d.vars.animation.toLowerCase() == "slide") {
                d.sliderTimer;
                a(window).resize(function() {
                    d.newSlides.width(d.width());
                    d.container.width(((d.count + d.cloneCount) * d.width()) + 2000);
                    clearTimeout(d.sliderTimer);
                    d.sliderTimer = setTimeout(function() {
                        d.flexAnimate(d.currentSlide)
                    }, 300)
                })
            }
            d.vars.start(d)
        };
        d.flexAnimate = function(f, e) {
            if (!d.animating) {
                d.animating = true;
                d.animatingTo = f;
                d.vars.before(d);
                if (e) {
                    d.pause()
                }
                if (d.vars.controlNav) {
                    d.controlNav.removeClass("active").eq(f).addClass("active")
                }
                d.atEnd = (f == 0 || f == d.count - 1) ? true : false;
                if (!d.vars.animationLoop && d.vars.directionNav) {
                    if (f == 0) {
                        d.directionNav.removeClass("disabled").filter(".prev").addClass("disabled")
                    } else {
                        if (f == d.count - 1) {
                            d.directionNav.removeClass("disabled").filter(".next").addClass("disabled")
                        } else {
                            d.directionNav.removeClass("disabled")
                        }
                    }
                }
                if (!d.vars.animationLoop && f == d.count - 1) {
                    d.pause();
                    d.vars.end(d)
                }
                if (d.vars.animation.toLowerCase() == "slide") {
                    if (d.currentSlide == 0 && f == d.count - 1 && d.vars.animationLoop && d.direction != "next") {
                        d.slideString = "0px"
                    } else {
                        if (d.currentSlide == d.count - 1 && f == 0 && d.vars.animationLoop && d.direction != "prev") {
                            d.slideString = (-1 * (d.count + 1)) * d.slides.filter(":first").width() + "px"
                        } else {
                            d.slideString = (-1 * (f + d.cloneOffset)) * d.slides.filter(":first").width() + "px"
                        }
                    }
                    d.container.animate({
                        marginLeft: d.slideString
                    }, d.vars.animationDuration, function() {
                        if (d.currentSlide == 0 && f == d.count - 1 && d.vars.animationLoop) {
                            d.container.css({
                                marginLeft: (-1 * d.count) * d.slides.filter(":first").width() + "px"
                            })
                        } else {
                            if (d.currentSlide == d.count - 1 && f == 0 && d.vars.animationLoop) {
                                d.container.css({
                                    marginLeft: -1 * d.slides.filter(":first").width() + "px"
                                })
                            }
                        }
                        d.animating = false;
                        d.currentSlide = f;
                        d.vars.after(d)
                    })
                } else {
                    d.slides.eq(d.currentSlide).fadeOut(d.vars.animationDuration);
                    d.slides.eq(f).fadeIn(d.vars.animationDuration, function() {
                        d.animating = false;
                        d.currentSlide = f;
                        d.vars.after(d)
                    })
                }
            }
        };
        d.animateSlides = function() {
            if (!d.animating) {
                var e = (d.currentSlide == d.count - 1) ? 0 : d.currentSlide + 1;
                d.flexAnimate(e)
            }
        };
        d.pause = function() {
            clearInterval(d.animatedSlides);
            if (d.vars.pausePlay) {
                d.pausePlay.removeClass("pause").addClass("play").text(d.vars.playText)
            }
        };
        d.resume = function() {
            d.animatedSlides = setInterval(d.animateSlides, d.vars.slideshowSpeed);
            if (d.vars.pausePlay) {
                d.pausePlay.removeClass("play").addClass("pause").text(d.vars.pauseText)
            }
        };
        d.canAdvance = function(e) {
            if (!d.vars.animationLoop && d.atEnd) {
                if (d.currentSlide == 0 && e == d.count - 1 && d.direction != "next") {
                    return false
                } else {
                    if (d.currentSlide == d.count - 1 && e == 0 && d.direction == "next") {
                        return false
                    } else {
                        return true
                    }
                }
            } else {
                return true
            }
        };
        d.getTarget = function(e) {
            d.direction = e;
            if (e == "next") {
                return (d.currentSlide == d.count - 1) ? 0 : d.currentSlide + 1
            } else {
                return (d.currentSlide == 0) ? d.count - 1 : d.currentSlide - 1
            }
        };
        d.init()
    };
    a.flexslider.defaults = {
        animation: "fade",
        slideshow: true,
        slideshowSpeed: 7000,
        animationDuration: 600,
        directionNav: true,
        controlNav: true,
        keyboardNav: true,
        touchSwipe: true,
        prevText: "Previous",
        nextText: "Next",
        pausePlay: false,
        pauseText: "Pause",
        playText: "Play",
        randomize: false,
        slideToStart: 0,
        animationLoop: true,
        pauseOnAction: true,
        pauseOnHover: false,
        controlsContainer: "",
        manualControls: "",
        start: function() {},
        before: function() {},
        after: function() {},
        end: function() {}
    };
    a.fn.flexslider = function(b) {
        return this.each(function() {
            if (a(this).find(".slides li").length == 1) {
                a(this).find(".slides li").fadeIn(400)
            } else {
                if (a(this).data("flexslider") != true) {
                    new a.flexslider(a(this), b)
                }
            }
        })
    }
})(jQuery);

$(document).ready(function() {
        $("#nav-mobile").html($(".menu-container").html());
        $("#nav-trigger span").click(function() {
          if ($(".menu-container ul").hasClass("expanded")) {
            $(".menu-container ul.expanded").removeClass("expanded").slideUp(250);
            $(this).removeClass("open");
          } else {
            $(".menu-container ul").addClass("expanded").slideDown(250);
            $(this).addClass("open");
          }
        });
      });


      $(document).ready(function() {
        $("#nav-mobile").html($(".menu-container").html());
        $("#nav-trigger span").click(function() {
          if ($("nav#nav-mobile ul").hasClass("expanded")) {
            $("nav#nav-mobile ul.expanded").removeClass("expanded").slideUp(250);
            $(this).removeClass("open");
          } else {
            $("nav#nav-mobile ul").addClass("expanded").slideDown(250);
            $(this).addClass("open");
          }
        });
      });