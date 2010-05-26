
getLineSeparator = function(){
        //summary: Gives the line separator for the platform.
        //For web builds override this function.
        return java.lang.System.getProperty("line.separator"); //Java String
}

readFile = function(/*String*/path, /*String?*/encoding){
        //summary: reads a file and returns a string
        encoding = encoding || "utf-8";
        var file = new java.io.File(path);
        var lineSeparator = getLineSeparator();
        var input = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(file), encoding));
        try{
                var stringBuffer = new java.lang.StringBuffer();
                var line = input.readLine();

                // Byte Order Mark (BOM) - The Unicode Standard, version 3.0, page 324
                // http://www.unicode.org/faq/utf_bom.html

                // Note that when we use utf-8, the BOM should appear as "EF BB BF", but it doesn't due to this bug in the JDK:
                // http://bugs.sun.com/bugdatabase/view_bug.do?bug_id=4508058
                if(line  && line.charAt(0) === 0xfeff){
                        // Eat the BOM, since we've already found the encoding on this file,
                        // and we plan to concatenating this buffer with others; the BOM should
                        // only appear at the top of a file.
                        line = line.substring(1);
                }
                while(line !== null){
                        stringBuffer.append(line);
                        stringBuffer.append(lineSeparator);
                        line = input.readLine();
                }
                //Make sure we return a JavaScript string and not a Java string.
                return new String(stringBuffer.toString()); //String
        }finally{
                input.close();
        }
}

