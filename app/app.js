
$(document).ready(function () {

	app.initialized()
		.then(function (_client) {
			window.client = _client;
			client.events.on('app.activated',
				function () {

					$('#createTicket').click(function () {
						let title = $('#title').val();
						let description = $('#desc').val();
						let email = $('#email').val();
						if(title && description && email){
							console.log('not  === empty');
							CreateFreshdeskTicket(title,description,email);
						}
						else{
							 showNotification('danger', 'Ticket Values cannot empty, Fill all values')
						}
					})
				});
		});


	/**
	 * 
	 * Function to Create a ticket 
	 *
	 */
	function CreateFreshdeskTicket(title,description,email) {

		client.request.post("https://vel1124.freshdesk.com/api/v2/tickets", {
			headers: {
				Authorization: "Basic <%= encode(iparam.freshdesk_api_key)%>",
				"Content-Type": "application/json;charset=utf-8"
			},

			body: JSON.stringify({
				description: `${description}`,
				email: `${email}`,
				priority: 1,
				status: 2,
				subject: `${title}`
			})
		}).then(function () {
			showNotification('success', 'Ticket is successfully created');
		})
		.catch(function () {
			showNotification('danger', 'Unable to create ticket');
		});
	}

	function showNotification(status, message) {
		client.interface.trigger("showNotify", {
			type: `${status}`,
			message: `${message}`
			/* The "message" should be plain text */
		}).then(function () {
			console.log('showed notification');
		}).catch(function () {
			console.log('failed to show notification');			
		});
	}
});
  