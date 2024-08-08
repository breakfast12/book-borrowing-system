/**
 * Member Collection response.
 */
function memberResource(member) {
  return {
    id: member.id,
    code: member.code,
    name: member.name,
    createdAt: member.createdAt,
    updatedAt: member.updatedAt,
  };
}

function memberCollection(members) {
  // Map each member object to the standardized format.
  return members.map(memberResource);
}

module.exports = {
  memberResource,
  memberCollection,
};
