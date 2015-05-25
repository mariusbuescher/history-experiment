<!DOCTYPE html>
<html>
<head>
    {% import 'partials/pagetitle.njs' as title %}
    <title>{{ title.pagetitle(pagetitle) }}</title>

    <link rel="stylesheet" type="text/css" href="/css/main.css" >
</head>
<body>

    <main class="page">
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/subfolder">Sub-Page</a></li>
                <li><a href="/subfolder/page2.html">Sub-Page 2</a></li>
            </ul>
        </nav>
        <div id="main-content">
            {% import 'partials/content.njs' as contentTemplate %}
            {{ contentTemplate.content(content) }}
        </div>
    </main>

    <script type="text/javascript" data-main="/js/custom/main" src="/js/vendor/require.js"></script>

</body>
</html>
