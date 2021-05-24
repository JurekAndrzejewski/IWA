<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Fibonacci</title>
</head>
<body>

<h1>${message}</h1>

<h2>Fibonacci</h2>
<form:form method="post" action="addFibonacci.html" modelAttribute="fibonacci">

    <form:label path="elem">Element</form:label>
    <form:input path="elem" />
    <br>
    <input type="submit" value="Get result"/>

</form:form>
</body>
</html>
