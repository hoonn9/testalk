const privateResolver = resolverFunction => async (parent, args, context, info) => {

    // context (graphql server in context setting value)
    // info  (fieldName, schema, returnType ...)

    if (!context.req.user) {
        throw new Error("No JWT. I refuse to proceed");
    }
    const resolved = await resolverFunction(parent, args, context, info);
    return resolved;
}

export default privateResolver;