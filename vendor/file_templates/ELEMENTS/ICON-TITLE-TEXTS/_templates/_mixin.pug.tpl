mixin <%= elementName %>(icon,title,text,classModifier)
    -if (!className) className =''
    li(class='<%elementName%>')
        .iconWrapper
            svg(class='<%elementName%> ' + classModifier)
                use(xlink:href="#" + icon)
        h5=title+':'
        span=text


