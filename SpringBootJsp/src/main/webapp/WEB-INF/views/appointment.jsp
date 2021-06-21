<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Add appointment</title>
</head>
<body>

<h1>${message}</h1>

<h2>APpointment</h2>
<form:form method="post" action="addAppointment.html" modelAttribute="appointment">

    <form:label path="date">Date</form:label>
    <form:input path="date" />
    <br>
    <form:label path="time">Time</form:label>
    <form:input path="time" />
    <br>
    <form:label path="address">Address</form:label>
    <form:input path="address" />
    <br>
    <input type="submit" value="Add Appointment"/>

</form:form>
</body>
</html>
