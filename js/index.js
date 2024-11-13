$(function () {
    // 헤더 메뉴 글자 효과
    Splitting();

    let prevScroll = 0;
    $(window).on("scroll", function () {
        let nowScroll = $(window).scrollTop();
        if (nowScroll > prevScroll) {
            $("header").addClass("on");
        } else {
            $("header").removeClass("on");
        }
        prevScroll = nowScroll;
    });
    // 메뉴, 네비 클릭 변경//
    $("header li").on("click", function () {
        let i = $(this).index();
        let target = $("#container section").eq(i).offset().top;
        console.log(target);

        $("html, body").stop().animate({ scrollTop: target });
    });

    // 일러스트 슬라이드 효과
    $(function () {
        let total = $(".panel li").length;
        // console.log(total);
        let i = 0;
        start();

        // ========정리=========//

        function move() {
            i++;
            if (i == total - 1) {
                $(".panel")
                    .stop()
                    .animate({ "margin-left": "-3600px" }, function () {
                        $(".panel").css({ "margin-left": 0 });
                    });
                i = 0;
            } else {
                $(".panel")
                    .stop()
                    .animate({ "margin-left": -i * 600 });
            }
        }

        function backmove() {
            i--;
            if (i < 0) {
                $(".panel").css({ "margin-left": -3600 });
                $(".panel").stop().animate({ "margin-left": -3000 });
                i = 5;
            } else {
                $(".panel")
                    .stop()
                    .animate({ "margin-left": -i * 600 });
            }
        }

        function style() {
            $(".navi li").removeClass("on");
            $(".navi li").eq(i).addClass("on");
        }

        //================================================================//

        // 슬라이드 //
        function start() {
            timer = setInterval(function () {
                move();
                style();
            }, 2000);
        }

        //다음클릭//
        $(".next").on("click", function () {
            clearInterval(timer); //클릭 잠시 멈춤//
            move();
            style();
            start();
        });

        //이전클릭//
        $(".prev").on("click", function () {
            clearInterval(timer);
            backmove();
            style();
            start();
        });

        //하단클릭//
        $(".navi li").on("click", function () {
            clearInterval(timer);
            i = $(this).index();
            $(".panel")
                .stop()
                .animate({ "margin-left": -i * 600 });
            style();
            start();
        });
    });
});
