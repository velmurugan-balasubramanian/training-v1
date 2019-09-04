
$(document).ready(function () {

	app.initialized()
		.then(function (_client) {
			window.client = _client;
			client.events.on('app.activated',
				function () {
					onLoadClickEventHandler();
				});
		},
			function () {
				showNotification('danger', 'Unable to load app');
			});



	/**
	 *   Collection of on load Click events 
	 */
	function onLoadClickEventHandler() {

		$('#createTicket').click(function () {
			let title = $('#title').val();				// Ticket title fetched from user Input
			let desc = $('#desc').val();					// Description of the ticket fetched from user input
			let email = $('#email').val();				// Email id of the user, creating the ticket
			if (title && desc && email) {
				CreateFreshdeskTicket(title, desc, email);
			}
			else {
				showNotification('danger', 'Ticket Values cannot empty, Fill all values')
			}
		});
	}


	/**
	 * 
	 * @param {String} title 					Ticket title
	 * @param {String} description 		Ticket description
	 * @param {String} email 					email of the user that creates ticket 
	 */
	function CreateFreshdeskTicket(title, description, email) {

		client.request.post("https://<%=iparam.freshdesk_subdomain%>.freshdesk.com/api/v2/tickets", {
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
			clearInputfields();
		})
			.catch(function () {
				showNotification('danger', 'Unable to create ticket');
			});
	}


	/**
	 * 
	 * @param {String} status   	Status of the notification
	 * @param {String} message  	Custom notification message 
	 */
	function showNotification(status, message) {
		client.interface.trigger("showNotify", {
			type: `${status}`,
			message: `${message}`
		})
	}

	function clearInputfields() {		
		$('#title').val('');				// Ticket title fetched from user Input
		$('#desc').val('');					// Description of the ticket fetched from user input
		$('#email').val('');
	}
});
