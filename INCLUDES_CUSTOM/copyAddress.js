function copyAddress(srcCapId, targetCapId)
{
	var vResult;
	//1. Get address with source CAPID.
	var capAddresses = getAddress(srcCapId);
	if (capAddresses == null || capAddresses.length == 0)
	{
		return;
	}
	//2. Get addresses with target CAPID.
	var targetAddresses = getAddress(targetCapId);
	//3. Check to see which address is matched in both source and target.
	for (loopk in capAddresses)
	{
		sourceAddressfModel = capAddresses[loopk];
		//3.1 Set target CAPID to source address.
		sourceAddressfModel.setCapID(targetCapId);
		targetAddressfModel = null;
		//3.2 Check to see if sourceAddress exist.
		if (targetAddresses != null && targetAddresses.length > 0)
		{
			for (loop2 in targetAddresses)
			{
				if (isMatchAddress(sourceAddressfModel, targetAddresses[loop2]))
				{
					targetAddressfModel = targetAddresses[loop2];
					break;
				}
			}
		}
		//3.3 It is a matched address model.
		if (targetAddressfModel != null)
		{
		
			//3.3.1 Copy information from source to target.
			vResult = aa.address.copyAddressModel(sourceAddressfModel, targetAddressfModel);
			logDebug("Copy address: " + vResult);
			//3.3.2 Edit address with source address information. 
			vResult = aa.address.editAddressWithAPOAttribute(targetCapId, targetAddressfModel);
			logDebug("Copy address attributes: " + vResult);
		}
		//3.4 It is new address model.
		else
		{	
			//3.4.1 Create new address.
			vResult = aa.address.createAddressWithAPOAttribute(targetCapId, sourceAddressfModel);
			logDebug("Created new address with attributes");
		}
	}
}